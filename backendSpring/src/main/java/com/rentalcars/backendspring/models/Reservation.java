package com.rentalcars.backendspring.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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



    @Enumerated(EnumType.STRING)
    private ReservationStatus status = ReservationStatus.EN_COURS;

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

    public Long getId() {
        return id ;
    }

 public void setStatus(ReservationStatus status) {
        this.status = status;
 }
 public ReservationStatus getStatus() {
            return status;
 }

}
