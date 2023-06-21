package com.mingeso.acopioservice.controllers;

import com.mingeso.acopioservice.entities.AcopioEntity;
import com.mingeso.acopioservice.services.AcopioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.FileNotFoundException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/acopio")
public class AcopioController {

    @Autowired
    AcopioService acopioServices;

    @GetMapping()
    public ResponseEntity<List<AcopioEntity>> obtenerAcopios() {
        List<AcopioEntity> acopios = acopioServices.obtenerAcopios();
        if (acopios.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(acopios);
    }

    @GetMapping("/quincena/{proveedor}")
    public ResponseEntity<Date> obtenerQuincenaByProveedor(@PathVariable("proveedor") String proveedor) {
        Date quincena = acopioServices.obtenerQuincenaByProveedor(proveedor);
        if (quincena == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(quincena);
    }

    @GetMapping("/leche/{proveedor}")
    public ResponseEntity<Integer> klsLeche(@PathVariable("proveedor") String proveedor){
        Integer leche = acopioServices.klsLeche(proveedor);
        if ( leche == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(leche);
    }

    @GetMapping("/diasEnvio/{proveedor}")
    public ResponseEntity<Integer> obtenerDiasEnvioLeche(@PathVariable("proveedor") String proveedor){
        Integer dias = acopioServices.obtenerDiasEnvioLeche(proveedor);
        if ( dias == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dias);
    }

    @GetMapping("/promedioDias/{proveedor}")
    public ResponseEntity<Integer> obtenerPromedioDiarioLeche(@PathVariable("proveedor") String proveedor){
        Integer promedio = acopioServices.obtenerPromedioDiarioLeche(proveedor);
        if ( promedio == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(promedio);
    }

    @GetMapping("/enviosTardeByProveedor/{proveedor}")
    public ResponseEntity<Integer> enviosTardeByProveedor(@PathVariable("proveedor") String proveedor){
        Integer enviosTarde = acopioServices.enviosTardeByProveedor(proveedor);
        if ( enviosTarde == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(enviosTarde);
    }

    @GetMapping("/enviosMananaByProveedor/{proveedor}")
    public ResponseEntity<Integer> enviosMananaByProveedor(@PathVariable("proveedor") String proveedor){
        Integer enviosManana = acopioServices.enviosMananaByProveedor(proveedor);
        if ( enviosManana == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(enviosManana);
    }

    @PostMapping("/fileUploadAcopios")
    public void upload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) throws FileNotFoundException, ParseException {
        acopioServices.guardarArchivoAcopio(file);
        redirectAttributes.addFlashAttribute("mensaje", "¡Archivo cargado correctamente!");
        acopioServices.leerCsvAcopio("Acopio.csv");
    }
}
