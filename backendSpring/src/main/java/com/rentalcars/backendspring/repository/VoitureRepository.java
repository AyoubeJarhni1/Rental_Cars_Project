package com.rentalcars.backendspring.repository;


import com.rentalcars.backendspring.models.Voiture;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoitureRepository extends JpaRepository<Voiture, Long> {
    @Override
    <S extends Voiture> List<S> findAll(Example<S> example);

    List<Voiture> findByStatus(Voiture.Status status);
}
