package com.anabol.motosale.controllers;

import com.anabol.motosale.dao.repository.*;
import com.anabol.motosale.form.MapWrapper;
import com.anabol.motosale.model.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
@Transactional
public class DictionaryController {

    @Inject
    private CategoryRepository categoryDao;
    @Inject
    private CoolingTypeRepository coolingTypeDao;
    @Inject
    private EngineTypeRepository engineTypeDao;
    @Inject
    private FinalDriveTypeRepository finalDriveTypeDao;
    @Inject
    private StarterTypeRepository starterTypeDao;

    @RequestMapping(value = "/admin/dictionary", method = RequestMethod.GET)
    public String dictionaryIndex(Model model) {
        model.addAttribute("categories", categoryDao.findAll());
        model.addAttribute("coolingTypes", coolingTypeDao.findAll());
        model.addAttribute("engineTypes", engineTypeDao.findAll());
        model.addAttribute("finalDriveTypes", finalDriveTypeDao.findAll());
        model.addAttribute("starterTypes", starterTypeDao.findAll());
        return "dictionary";
    }

    @RequestMapping(value = "/ajax/category/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void saveCategories(@RequestBody Map<String, String> categoriesMap, BindingResult bindingResult) throws ServletException, IOException {
        for (String id: categoriesMap.keySet()) {
            String categoryName = categoriesMap.get(id);
            Category category = categoryDao.findOne(Long.valueOf(id));
            category.setName(categoryName);
            categoryDao.save(category);
        }
    }

    @RequestMapping(value = "/ajax/engineType/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void saveEngineTypes(@RequestBody Map<String, String> engineTypesMap, BindingResult bindingResult) throws ServletException, IOException {
        for (String id: engineTypesMap.keySet()) {
            String engineTypeName = engineTypesMap.get(id);
            EngineType engineType = engineTypeDao.findOne(Long.valueOf(id));
            engineType.setName(engineTypeName);
            engineTypeDao.save(engineType);
        }
    }

    @RequestMapping(value = "/ajax/coolingType/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void saveCoolingTypes(@RequestBody Map<String, String> coolingTypesMap, BindingResult bindingResult) throws ServletException, IOException {
        for (String id: coolingTypesMap.keySet()) {
            String coolingTypeName = coolingTypesMap.get(id);
            CoolingType coolingType = coolingTypeDao.findOne(Long.valueOf(id));
            coolingType.setName(coolingTypeName);
            coolingTypeDao.save(coolingType);
        }
    }

    @RequestMapping(value = "/ajax/finalDriveType/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void saveFinalDriveTypes(@RequestBody Map<String, String> finalDriveTypesMap, BindingResult bindingResult) throws ServletException, IOException {
        for (String id: finalDriveTypesMap.keySet()) {
            String finalDriveTypeName = finalDriveTypesMap.get(id);
            FinalDriveType finalDriveType = finalDriveTypeDao.findOne(Long.valueOf(id));
            finalDriveType.setName(finalDriveTypeName);
            finalDriveTypeDao.save(finalDriveType);
        }
    }

    @RequestMapping(value = "/ajax/starterType/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void saveStarterTypes(@RequestBody Map<String, String> starterTypesMap, BindingResult bindingResult) throws ServletException, IOException {
        for (String id: starterTypesMap.keySet()) {
            String starterTypeName = starterTypesMap.get(id);
            StarterType starterType = starterTypeDao.findOne(Long.valueOf(id));
            starterType.setName(starterTypeName);
            starterTypeDao.save(starterType);
        }
    }
}
