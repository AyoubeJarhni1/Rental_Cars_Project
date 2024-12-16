package com.rentalcars.backendspring.payload.response;

import com.rentalcars.backendspring.models.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class UserResponseDto {

    private Long id;
    private String name;
    private String email;
    private String password;
    private String nTele;
    private String adress;
    private Date dateNaiss;
    private Role role;
}
