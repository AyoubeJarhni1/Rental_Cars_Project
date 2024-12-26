package com.rentalcars.backendspring.payload.request;

public class ReservatDTO {
    private Long reservationId;
    private String type; // Type de la voiture
    private String marque; // Marque de la voiture
    private int modele; // Modèle de la voiture
    private int prix; // Prix de la voiture
    private String pathimage;
    private String matricule;// Chemin de l'image de la voiture

    private String dateDb; // Date de début de réservation
    private String dateFin;

    public String getDateDb() {
        return dateDb;
    }

    public void setDateDb(String dateDb) {
        this.dateDb = dateDb;
    }

    public String getDateFin() {
        return dateFin;
    }

    public void setDateFin(String dateFin) {
        this.dateFin = dateFin;
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

    public String getPathimage() {
        return pathimage;
    }

    public void setPathimage(String pathimage) {
        this.pathimage = pathimage;
    }

    public int getPrix() {
        return prix;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setMatricule(String matricule){
        this.matricule = matricule;
    }
    public String getMatricule() {
        return matricule;
    }

}
