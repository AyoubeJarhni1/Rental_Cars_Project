package com.rentalcars.backendspring.payload.response;

public class VoitureResponse {
    private Long id;
    private String marque;
    private int modele;
    private String type;
    private int prix;
    private String pathimage;


    public void setId(long id) {
        this.id=id ;
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
