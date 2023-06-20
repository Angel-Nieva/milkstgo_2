package com.mingeso.acopioservice.controllers;

import com.mingeso.acopioservice.entities.AcopioEntity;
import com.mingeso.acopioservice.services.AcopioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.FileNotFoundException;
import java.text.ParseException;
import java.util.List;

@Controller
@RequestMapping("/acopios")
public class AcopioController {

    @Autowired
    AcopioService acopioServices;

    @GetMapping()
    public ResponseEntity<List<AcopioEntity>> obtenerAcopios(Model model) {
        List<AcopioEntity> acopios = acopioServices.obtenerAcopios();
        if (acopios.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(acopios);
    }
    
    @PostMapping("/fileUploadAcopios")
    public void upload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) throws FileNotFoundException, ParseException {
        acopioServices.guardarArchivoAcopio(file);
        redirectAttributes.addFlashAttribute("mensaje", "¡Archivo cargado correctamente!");
        acopioServices.leerCsvAcopio("Acopio.csv");
    }
}
