package com.rentalcars.backendspring.payload.response;

import com.rentalcars.backendspring.models.ReservationStatus;

import java.util.Date;

public class ReservationNotific {

    private Long id;
    private Date dateDb;
    private Date dateFin;
    private Date dateGeneration ;
    private String nameUser;
    private String marqueVoiture;
   private String matriculeVoiture ;



    public Long getId() {
        return id;
    }



    public void setId(Long id) {
        this.id = id;
    }


    public Date getDateDb() {
        return dateDb;
    }

    public void setDateDb(Date dateDb) {
        this.dateDb = dateDb;
    }

    // Getter et Setter pour dateFin
    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public String getNameUser() {
        return nameUser;
    }
    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
    }

    public void setMarqueVoiture(String marqueVoiture) {
        this.marqueVoiture = marqueVoiture;
    }

    public void setMatriculeVoiture(String matriculeVoiture) {
        this.matriculeVoiture = matriculeVoiture;
    }

    public String getMarqueVoiture() {
        return marqueVoiture;
    }
    public String getMatriculeVoiture() {
        return matriculeVoiture;
    }
    public Date getDateGeneration(){
        return dateGeneration;
    }
    public void setDateGeneration(Date dateGeneration) {
        this.dateGeneration = dateGeneration;
    }


}
