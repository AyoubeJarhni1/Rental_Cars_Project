package com.rentalcars.backendspring.payload.request;


import java.util.Date;

public class ReservationRequest {
    private Long userId;
    private Long voitureId;
    private Date dateDb;
    private Date dateFin;

    // Getters et setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getVoitureId() {
        return voitureId;
    }

    public void setVoitureId(Long voitureId) {
        this.voitureId = voitureId;
    }

    public Date getDateDb() {
        return dateDb;
    }

    public void setDateDb(Date dateDb) {
        this.dateDb = dateDb;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }
}

