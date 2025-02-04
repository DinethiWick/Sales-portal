package com.summit.product.service;

import com.summit.product.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> getProducts(String query);

    Product getProductById(String productId);

    Product addNewProduct(Product product);

    void removeProduct(String productId);

    Product updateProductDetails(Product product);

    List<String> getAllProductCategories();

}
