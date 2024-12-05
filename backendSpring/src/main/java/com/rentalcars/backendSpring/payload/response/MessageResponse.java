

package com.rentalcars.backendSpring.payload.response;

public class MessageResponse {

    private String message;

    // Constructor
    public MessageResponse(String message) {
        this.message = message;
    }

    // Getter
    public String getMessage() {
        return message;
    }

    // Setter
    public void setMessage(String message) {
        this.message = message;
    }
}

