package com.anabol.motosale.dao;

import com.anabol.motosale.dao.repository.ManufacturerRepository;
import com.anabol.motosale.model.Manufacturer;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ManufacturerDaoImpl implements ManufacturerDao{

    @Autowired
    ManufacturerRepository manufacturerRepository;

    public List<Manufacturer> getAllManufacturers() {
            List<Manufacturer> manufacturers = (List<Manufacturer>) manufacturerRepository.findAll();
        return manufacturers;
    }

    public Manufacturer findManufacturerById(Long id) {
            Manufacturer manufacturer = manufacturerRepository.findOne(id);
        return manufacturer;
    }

    public void insertManufacturer(Manufacturer manufacturer) {
        manufacturerRepository.save(manufacturer);
    }

    public void updateManufacturer(Manufacturer manufacturer) {
        Manufacturer existingManufacturer = findManufacturerById(manufacturer.getId());
        existingManufacturer.setName(manufacturer.getName());
    }

    public void deleteById(Long id) {
        manufacturerRepository.delete(id);
    }

}
