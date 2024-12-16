package com.rentalcars.backendspring.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity

public class Contrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    private String statut;
    private Date dateGeneration;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getStatut() {
        return statut;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public void setDateGeneration(Date date) {
        this.dateGeneration = date;
    }
}
