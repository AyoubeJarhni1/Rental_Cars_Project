package com.rentalcars.backendspring.payload.request;

public class RequestTicket {


        private Long reservationId;
        private Float priceTotal;

    public Float getPriceTotal() {
        return priceTotal;
    }
    public void setPriceTotal(Float priceTotal) {
        this.priceTotal = priceTotal;
    }

    public Long getReservationId() {
        return reservationId;
    }
    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

}
