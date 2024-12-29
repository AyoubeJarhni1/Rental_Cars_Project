package com.rentalcars.backendspring.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reservation_id")
    @NotNull
    private Reservation reservation ;
    private Float priceTotal;

    @Temporal(TemporalType.TIMESTAMP)
    Date dateGeneration ;

    public void setReservation(@NotNull Reservation reservation) {
        this.reservation = reservation;
    }
    public Reservation getReservation() {
        return reservation;
    }

    public  Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getPriceTotal() {
        return priceTotal;
    }
    public void setPriceTotal(Float priceTotal) {
            this.priceTotal = priceTotal;
    }


}
