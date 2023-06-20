package com.mingeso.proveedorservice.controllers;

import com.mingeso.proveedorservice.entities.ProveedorEntity;
import com.mingeso.proveedorservice.services.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proveedor")
public class ProveedorController {

    @Autowired
    private ProveedorService proveedorServices;

    @GetMapping()
    public ResponseEntity<List<ProveedorEntity>> obtenerProveedores() {
        List<ProveedorEntity> proveedores = proveedorServices.obtenerProveedores();
        if(proveedores.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(proveedores);
    }

    @PostMapping()
    public ResponseEntity<ProveedorEntity> guardarProveedor(@RequestBody ProveedorEntity proveedor){
        ProveedorEntity nuevoProveedor = proveedorServices.guardarProveedor(proveedor);
        return ResponseEntity.ok(nuevoProveedor);
    }
}
