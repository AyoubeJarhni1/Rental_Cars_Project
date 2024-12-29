package com.rentalcars.backendspring.payload.response;

import java.util.Date;

public class TicketResponse {
   private Long id;
   private Float priceTotal;
    private Date dateGeneration ;
    private String nameClient ;
    private String nTele ;
    private String marqueCar;
    private String matricule ;
    public Date dateDb;
    public Date dateFn ;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    public void setPriceTotal(Float priceTotal) {
        this.priceTotal = priceTotal;
    }
    public Float getPriceTotal() {
        return priceTotal;
    }
    public void setDateGeneration(Date dateGeneration) {
this.dateGeneration = dateGeneration;
    }

    public Date getDateGeneration() {
        return dateGeneration;
    }

    public void setDateDb(Date dateDb) {
        this.dateDb = dateDb;
    }
    public Date getDateDb() {
        return dateDb;
    }

    public void setDateFn(Date dateFn) {
        this.dateFn = dateFn;
    }
    public Date getDateFn() {
        return dateFn;
    }

    public void setMatricule(){
        this.matricule = nameClient;
    }
    public String getMatricule() {
        return matricule;
    }
    public void setNameClient(String nameClient) {
        this.nameClient = nameClient;
    }
    public String getNameClient() {
        return nameClient;
    }
    public void setNTele(String nTele) {
        this.nTele = nTele;
    }
    public String getNTele() {
        return nTele;
    }
    public void setMarqueCar(String marqueCar) {
        this.marqueCar = marqueCar;
    }
    public String getMarqueCar() {
        return marqueCar;
    }
    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

}
