package com.mingeso.reporteservice.services;

import com.mingeso.reporteservice.entities.ReporteEntity;
import com.mingeso.reporteservice.models.GrasaSolidoModel;
import com.mingeso.reporteservice.models.ProveedorModel;
import com.mingeso.reporteservice.repositories.ReporteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import static java.lang.Math.round;

@Service
public class ReporteService {
    @Autowired
    ReporteRepository reporteRepository;

    @Autowired
    RestTemplate restTemplate;

    public List<String> obtenerCodigosProveedores(){
        List<String> codigoProveedores = restTemplate.getForObject("http://proveedor-service/proveedor/codigo",List.class);
        return codigoProveedores;
    }

    public ProveedorModel obtenerProovedorByCodigo(String codigo){
        ProveedorModel proveedor = restTemplate.getForObject("http://proveedor-service/proveedor/byCodigo/" + codigo, ProveedorModel.class);
        return proveedor;
    }

    public GrasaSolidoModel obtenerGrasaSolidoByProveedor(String proveedor){
        GrasaSolidoModel grasaSolido = restTemplate.getForObject("http://grasasolido-service/grasa-solido/byProveedor/" + proveedor, GrasaSolidoModel.class);
        return grasaSolido;
    }

    public Date obtenerQuincenaByProveedor(String proveedor){
        Date quincena = restTemplate.getForObject("http://acopio-service/acopio/quincena/" + proveedor, Date.class);
        return quincena;
    }

    public Integer klsLeche(String proveedor){
        Integer leche = restTemplate.getForObject("http://acopio-service/acopio/leche/" + proveedor, Integer.class);
        return leche;
    }

    public Integer obtenerDiasEnvioLeche(String proveedor){
        Integer dias = restTemplate.getForObject("http://acopio-service/acopio/diasEnvio/" + proveedor, Integer.class);
        return  dias;
    }

    public Integer obtenerPromedioDiarioLeche(String proveedor){
        Integer promedio = restTemplate.getForObject("http://acopio-service/acopio/promedioDias/" + proveedor, Integer.class);
        return  promedio;
    }

    public Integer enviosTardeByProveedor(String proveedor){
        Integer enviosTarde = restTemplate.getForObject("http://acopio-service/acopio/enviosTardeByProveedor/" + proveedor, Integer.class);
        return  enviosTarde;
    }

    public Integer enviosMananaByProveedor(String proveedor){
        Integer enviosManana = restTemplate.getForObject("http://acopio-service/acopio/enviosMananaByProveedor/" + proveedor, Integer.class);
        return  enviosManana;
    }

    public void calcularPlantillaPago(){
        List<String> codigoProveedores = obtenerCodigosProveedores();
        for (String codigProveedor : codigoProveedores){
            calularReporte(codigProveedor);
        }
    }

    public ReporteEntity calularReporte(String codigoProveedor){
        ProveedorModel proveedor = obtenerProovedorByCodigo(codigoProveedor);
        String codigo = proveedor.getCodigo();

        GrasaSolidoModel grasaSolido = obtenerGrasaSolidoByProveedor(codigo);

        ReporteEntity reporteAnterior = buscarReporteAnterior(
                obtenerQuincenaByProveedor(codigo), codigo);
        ReporteEntity reporteActual = new ReporteEntity();

        reporteActual.setQuincena(obtenerQuincenaByProveedor(codigo));
        reporteActual.setCodigo_proveedor(codigo);
        reporteActual.setNombre_proveedor(proveedor.getNombre());
        reporteActual.setKls_leche(klsLeche(codigo));
        reporteActual.setDiasEnvioLeche(obtenerDiasEnvioLeche(codigo));
        reporteActual.setAvgKls_leche(obtenerPromedioDiarioLeche(codigo));
        reporteActual.setVariacion_leche(variacionPorcentual(
                reporteActual.getKls_leche(),
                reporteAnterior.getKls_leche()));
        reporteActual.setGrasa(grasaSolido.getGrasa());
        reporteActual.setVariacion_grasa(variacionPorcentual(
                reporteActual.getGrasa(),
                reporteAnterior.getGrasa()));
        reporteActual.setSolidos_totales(grasaSolido.getSolido());
        reporteActual.setVariacion_st(variacionPorcentual(
                reporteActual.getSolidos_totales(),
                reporteAnterior.getSolidos_totales()));
        reporteActual.setPago_leche(pagoLeche(
                proveedor.getCategoria(),
                reporteActual.getKls_leche()));
        reporteActual.setPago_grasa(pagoGrasa(
                grasaSolido.getGrasa(),
                reporteActual.getKls_leche()));
        reporteActual.setPago_st(pagoSolidos(
                grasaSolido.getSolido(),
                reporteActual.getKls_leche()));
        reporteActual.setBonificacion_frecuencia( pagoBonificacionFrecuencia(
                enviosTardeByProveedor(codigo),
                enviosMananaByProveedor(codigo),
                reporteActual.getPago_leche() ));

        int pagoAcopioLeche =  pagoAcopioLeche(reporteActual.getPago_leche(),
                reporteActual.getPago_grasa(),
                reporteActual.getPago_st(),
                reporteActual.getBonificacion_frecuencia());

        reporteActual.setDct_leche(descuento(
                "leche",
                reporteActual.getVariacion_leche(),
                pagoAcopioLeche));
        reporteActual.setDct_grasa(descuento(
                "grasa",
                reporteActual.getVariacion_grasa(),
                pagoAcopioLeche));
        reporteActual.setDct_st(descuento(
                "solido",
                reporteActual.getVariacion_st(),
                pagoAcopioLeche));
        reporteActual.setPago_total(pagoTotal(
                pagoAcopioLeche,
                reporteActual.getDct_grasa()+reporteActual.getDct_st()+reporteActual.getDct_leche()));
        reporteActual.setMonto_retencion(retencion(
                proveedor.getRetencion(),
                reporteActual.getPago_total()));
        reporteActual.setMonto_final(reporteActual.getPago_total() - reporteActual.getMonto_retencion());
        return reporteRepository.save(reporteActual);
    }

    public void borrarReporteByFecha(Date fecha){ reporteRepository.deleteByFecha(fecha);}

    public List<ReporteEntity> obtenerPlanillaPagos(){
        return (ArrayList<ReporteEntity>) reporteRepository.findAll();
    }

    public int pagoCategoria(String categoria){
        return switch (categoria) {
            case "A" -> (700);
            case "B" -> (550);
            case "C" -> (400);
            case "D" -> (250);
            default -> 0;
        };
    }
    public int pagoLeche(String categoria, int klsLeche){
        return pagoCategoria(categoria)*klsLeche;
    }

    public int pagoGrasa(int grasa, int klsLeche ){
        if ( grasa >= 46  ){
            return 120*klsLeche;
        } else if ( grasa >= 21 ) {
            return 80*klsLeche;
        }else if ( grasa >= 0){
            return 30*klsLeche;
        }else{ // En caso de posibles valores negativos
            return 0;
        }
    }
    public int pagoSolidos(int solidos, int klsLeche){
        if ( solidos >= 36  ){
            return 150*klsLeche;
        } else if ( solidos >= 19 ) {
            return 95*klsLeche;
        } else if ( solidos >= 8){
            return -90*klsLeche;
        } else if ( solidos >= 0) {
            return -130*klsLeche;
        } else{ // En caso de posibles valores negativos
            return 0;
        }
    }

    public int pagoBonificacionFrecuencia(int enviosTarde, int enviosManana, int pagoLeche){
        if (enviosTarde > 10 && enviosManana > 10){
            return (pagoLeche/100)*20;
        } else if ( enviosManana > 10 ) {
            return (pagoLeche/100)*12;
        } else if ( enviosTarde > 10) {
            return (pagoLeche/100)*8;
        } else {
            return 0;
        }
    }

    public ReporteEntity buscarReporteAnterior(Date fecha, String proveedor){
        return reporteRepository.findReporteAnterior(fecha,proveedor);
    }

    public int  variacionPorcentual(int actual, int anterior){
        float variacion = (( (float) actual-anterior)/anterior)*100;
        return round(variacion);
    }

    public int descuento(String descuento, int variacion, int pagoAcopio){
        String LECHE = "leche";
        String GRASA = "grasa";
        String SOLIDO = "solido";
        HashMap<String, List<Integer>> PORCENTAJE_VARIACION = new HashMap<>();
        HashMap<String, List<Integer>> PORCENTAJE_DCT = new HashMap<>();

        // Configurar los valores para variacion negativa y descuento
        PORCENTAJE_VARIACION.put(LECHE, Arrays.asList(46, 26, 9));
        PORCENTAJE_VARIACION.put(GRASA, Arrays.asList(41, 26, 16));
        PORCENTAJE_VARIACION.put(SOLIDO, Arrays.asList(36, 13, 7));

        PORCENTAJE_DCT.put(LECHE, Arrays.asList(30, 15, 7));
        PORCENTAJE_DCT.put(GRASA, Arrays.asList(30, 20, 12));
        PORCENTAJE_DCT.put(SOLIDO, Arrays.asList(45, 27, 18));

        List<Integer> porcentajeVariacion, porcentajeDct;
        switch (descuento) {
            case "leche" -> {
                porcentajeVariacion = PORCENTAJE_VARIACION.get(LECHE);
                porcentajeDct = PORCENTAJE_DCT.get(LECHE);
            }
            case "grasa" -> {
                porcentajeVariacion = PORCENTAJE_VARIACION.get(GRASA);
                porcentajeDct = PORCENTAJE_DCT.get(GRASA);
            }
            case "solido" -> {
                porcentajeVariacion = PORCENTAJE_VARIACION.get(SOLIDO);
                porcentajeDct = PORCENTAJE_DCT.get(SOLIDO);
            }
            default -> throw new IllegalStateException("Unexpected value: " + descuento);
        }
        if (variacion < 0){
            variacion = (-1)*variacion;
            if ( variacion >= porcentajeVariacion.get(0)  ){
                return round(((float) pagoAcopio*porcentajeDct.get(0))/100);
            } else if ( variacion >= porcentajeVariacion.get(1) ) {
                return round(((float) pagoAcopio*porcentajeDct.get(1))/100);
            }else if ( variacion >= porcentajeVariacion.get(2)){
                return round(((float) pagoAcopio*porcentajeDct.get(2))/100);
            }else{
                return 0;
            }
        }
        return 0;
    }

    int pagoAcopioLeche(int pagoLeche, int pagoGrasa, int pagoST, int pagoBonificacion){
        return pagoLeche+pagoGrasa+pagoST+pagoBonificacion;
    }

    int pagoTotal(int pagoAcopio, int descuentos){
        return pagoAcopio - descuentos;
    }

    int retencion(String retencion ,int pagoTotal){
        if( retencion.equals("Si") && pagoTotal > 950000){
            return round(((float) pagoTotal*13)/100);
        }
        return 0;
    }
}
