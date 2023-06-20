package com.mingeso.reporteservice.repositories;

import com.mingeso.reporteservice.entities.ReporteEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface ReporteRepository extends CrudRepository<ReporteEntity, Long > {

    @Modifying
    @Query(value = "DELETE FROM reportes as p WHERE p.quincena = :fecha",
            nativeQuery = true)
    void  deleteByFecha(@Param("fecha") Date fecha);

    @Query(value = "SELECT * FROM reportes as p WHERE p.codigo_proveedor = :codigo AND p.quincena < :fecha ORDER BY p.quincena DESC limit 1",
            nativeQuery = true)
    ReporteEntity findReporteAnterior(@Param("fecha") Date fecha, @Param("codigo") String codigo );

}
