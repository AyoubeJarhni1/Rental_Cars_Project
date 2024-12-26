package com.rentalcars.backendspring.payload.response;

import com.rentalcars.backendspring.payload.request.ReservationRequest;

import java.util.List;

public class VoitureDTO {
    private Long id;
    private String type;
    private String marque;
    private int modele;
    private double prix;
    private String pathimage;
    private String status;
    private String matricule ;


    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getMarque() { return marque; }
    public void setMarque(String marque) { this.marque = marque; }

    public int getModele() { return modele; }
    public void setModele(int modele) { this.modele = modele; }

    public double getPrix() { return prix; }
    public void setPrix(double prix) { this.prix = prix; }

    public String getPathimage() { return pathimage; }
    public void setPathimage(String pathimage) { this.pathimage = pathimage; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
 public String getMatricule(){
        return matricule;
 }
 public void setMatricule(String matricule){ this.matricule = matricule; }

}
