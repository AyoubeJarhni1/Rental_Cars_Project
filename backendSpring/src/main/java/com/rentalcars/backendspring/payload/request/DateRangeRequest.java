package com.rentalcars.backendspring.payload.request;


import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class DateRangeRequest {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateDebut;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateFin;


    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }
}
