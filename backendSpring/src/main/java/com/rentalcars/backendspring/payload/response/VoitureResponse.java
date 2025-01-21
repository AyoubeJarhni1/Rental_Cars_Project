package com.rentalcars.backendspring.payload.response;

import com.rentalcars.backendspring.models.Voiture;

public class VoitureResponse {
    private Long id;
    private String marque;
    private int modele;
    private String type;
    private int prix;
    private String pathimage;
    private Voiture.Status status;

    public void setId(long id) {
        this.id=id ;
    }

    public void setStatus(Voiture.Status status) {
        this.status=status;
    }


    public void setMarque(String marque) {
        this.marque=marque;
    }

    public void setModele(int modele) {
        this.modele=modele;
    }

    public void setPrix(int prix) {
        this.prix=prix;
    }

    public void setPathimage(String pathimage) {
            this.pathimage=pathimage;
    }
}
