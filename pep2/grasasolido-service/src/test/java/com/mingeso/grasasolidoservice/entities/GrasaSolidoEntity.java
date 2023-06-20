package com.mingeso.grasasolidoservice.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "grasas_solidos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GrasaSolidoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(name = "proveedor", nullable = false)
    private String proveedor;

    @Column(name = "grasa", nullable = false)
    private Integer grasa;

    @Column(name = "solido", nullable = false)
    private Integer solido;
}
