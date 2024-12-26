package com.rentalcars.backendspring.payload.response;

import com.rentalcars.backendspring.models.ReservationStatus;

import java.util.Date;

public class ReservationResponse {
    private Long id;
    private Date dateDb;
    private Date dateFin;

    private Long idUser;     // Remplace UserResponse par idUser
    private Long idVoiture;
    private Long contratId;
private ReservationStatus status;

    public Long getContratId() {
        return contratId;
    }
    public void setContratId(Long contratId) {
        this.contratId = contratId;
    }

    public Long getId() {
        return id;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }
    public ReservationStatus getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter et Setter pour dateDb
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

    // Getter et Setter pour idUser
    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    // Getter et Setter pour idVoiture
    public Long getIdVoiture() {
        return idVoiture;
    }

    public void setIdVoiture(Long idVoiture) {
        this.idVoiture = idVoiture;
    }
}
