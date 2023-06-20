package com.mingeso.grasasolidoservice.controllers;

import com.mingeso.grasasolidoservice.entities.GrasaSolidoEntity;
import com.mingeso.grasasolidoservice.services.GrasaSolidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.FileNotFoundException;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/grasa-solido")
public class GrasaSolidoController {
    @Autowired
    private GrasaSolidoService grasa_solidoService;

    @GetMapping()
    public ResponseEntity<List<GrasaSolidoEntity>> obtenerGrasaSolidos(Model model) {
        List<GrasaSolidoEntity> grasas_solidos = grasa_solidoService.obtenerGrasaSolidos();
        if(grasas_solidos.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(grasas_solidos);
    }

    @PostMapping("/fileUpload")
    public void upload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) throws FileNotFoundException, ParseException {
        grasa_solidoService.guardarArchivoGrasaSolido(file);
        redirectAttributes.addFlashAttribute("mensaje", "¡Archivo cargado correctamente!");
        grasa_solidoService.leerCsvGrasaSolido("Grasas.csv");
    }

}
