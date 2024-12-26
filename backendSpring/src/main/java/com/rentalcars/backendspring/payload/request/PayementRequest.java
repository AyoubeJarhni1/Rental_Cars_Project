package com.rentalcars.backendspring.payload.request;

public class PayementRequest {
    private long amount; // Amount to be paid (in cents)

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }
}
