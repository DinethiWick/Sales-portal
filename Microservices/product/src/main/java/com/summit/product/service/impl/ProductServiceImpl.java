package com.summit.product.service.impl;

import com.summit.product.exception.ProductException;
import com.summit.product.exception.ProductNotFoundException;
import com.summit.product.model.Product;
import com.summit.product.repository.ProductRepository;
import com.summit.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;


    @Override
    public List<Product> getProducts(String query) {
        try{
            if (query != null && !query.isEmpty()){
                log.info("PRODUCT SERVICE | Getting {}",query);
                return productRepository.findByName(query);
            }
            else {
                log.info("PRODUCT SERVICE | Getting all products");
                return productRepository.findAll();
            }
        } catch (Exception exception){
            log.error("PRODUCT SERVICE | Failed with exception : {}", exception.getMessage());
            throw new ProductException();
        }
    }

    @Override
    public Product getProductById(String productId) {
        log.info("PRODUCT SERVICE | Getting product {}",productId);
        try {
            return productRepository.findById(productId).orElseThrow(
                    ()-> new ProductNotFoundException(productId)
            );
        }catch (ProductNotFoundException productNotFoundException){
            log.error("PRODUCT SERVICE | PRODUCT NOT FOUND");
            throw productNotFoundException;
        }catch (Exception exception){
            log.error("PRODUCT SERVICE | Query failed | Product ID:{} failed with exception {}",productId,exception.getMessage());
            throw new ProductException();
        }
    }

    @Override
    public Product addNewProduct(Product product) {
        try {
            Product newProduct = productRepository.save(product);
            log.info("PRODUCT SERVICE | Created product {}",product.getProductId());
            return newProduct;
        } catch (Exception exception){
            log.error("PRODUCT SERVICE | Create failed | Product ID:{} failed with exception {}",product.getProductId(),exception.getMessage());
            throw new ProductException();
        }
    }

    @Override
    public void removeProduct(String productId) {
        log.info("PRODUCT SERVICE | Deleting product {}",productId);
        try{
            productRepository.deleteById(productId);
        } catch (Exception exception){
            log.error("CART SERVICE | Delete failed | Product ID:{} failed with exception {}",productId,exception.getMessage());
            throw new ProductException();
        }
    }

    @Override
    public Product updateProductDetails(Product product) {
        log.info("PRODUCT SERVICE | Updating product {}",product.getProductId());
        try {
                return productRepository.save(product);
        }catch (ProductNotFoundException productNotFoundException){
            log.error("PRODUCT SERVICE | Product not found");
            throw productNotFoundException;
        }catch (Exception exception){
            log.error("PRODUCT SERVICE | Update failed | Product ID:{} failed with exception {}",product.getProductId(),exception.getMessage());
            throw new ProductException();
        }
    }

    @Override
    public List<String> getAllProductCategories() {
        try {
            List<String> categories = new ArrayList<>();
            for(Product product : getProducts(null)){
                String category = product.getCategory();
                if(!categories.contains(category)){
                    categories.add(category);
                }
            }
            return categories;
        } catch (Exception exception) {
            log.error("PRODUCT SERVICE | Query failed | failed with exception {}",exception.getMessage());
            throw new ProductException();
        }
    }
}
