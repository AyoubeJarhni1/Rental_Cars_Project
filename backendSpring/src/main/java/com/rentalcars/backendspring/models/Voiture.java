package com.rentalcars.backendspring.models;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Voiture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String type;
    private String marque;
    private int modele;
    private int prix;
   private  String matricule ;

    private String pathimage;


    @Enumerated(EnumType.STRING)
    private Status status;


    @ManyToOne
    @JoinColumn(name = "user_id")

    private User admin;

    @OneToMany(mappedBy = "voiture")
    private Set<Reservation> reservationset;

    public Set<Reservation> getReservationset() {
        return reservationset;
    }

    public enum Status {
        DISPONIBLE,
        RESERVEE,
        EN_REPARATION
    }

    public void setAdmin(User admin){
        this.admin=admin;
    }

    public User getAdmin(){
        return admin;
    }

    public String getPathimage() {
        return pathimage;
    }

    public void setPathimage(String pathimage) {
        this.pathimage = pathimage;
    }


    public void setStatus(Status status) {
        this.status = status;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getMarque() {
        return marque;
    }
    public void setMarque(String marque) {
        this.marque = marque;
    }
    public int getModele() {
        return modele;
    }
    public void setModele(int modele) {
        this.modele = modele;
    }
    public int getPrix() {
        return prix;
    }
    public void setPrix(int prix) {
        this.prix = prix;
    }

    public Status getStatus() {
        return status;
    }

    public String getMatricule(){
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule=matricule;
    }
}

