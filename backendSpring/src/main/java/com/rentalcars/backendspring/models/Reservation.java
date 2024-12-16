package com.rentalcars.backendspring.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date  dateDb;
    private Date dateFin;
    @ManyToOne
    @JoinColumn (name = "voiture_id")
    Voiture voiture;

    @ManyToOne
    @JoinColumn(name="user-id")
    User user ;

    public void setUser(User user) {
        this.user = user;
    }

    public void setVoiture(Voiture voiture) {
        this.voiture = voiture;
    }

    public void setDateDb(Date dateDb) {
        this.dateDb = dateDb;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public User getUser() {
        return user ;
    }

    public Voiture getVoiture() {
        return voiture;
    }
    public Date getDateDb() {
        return dateDb;
    }
    public Date getDateFin() {
        return dateFin;
    }

    public Object get() {
        return this;
    }

    public Object getId() {
        return id ;
    }
}
