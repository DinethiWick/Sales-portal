package com.summit.product.service;

import com.summit.product.model.Product;
import com.summit.product.repository.ProductRepository;
import com.summit.product.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    Product mockProduct;

    @Mock
    List<Product> mockProductList;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    @Test
    void testGetProducts(){
        mockProductList.add(new Product("123","product1","product","cat1",10,"brand1"));
        when(this.productRepository.findAll()) .thenReturn(mockProductList);

        List<Product> result = productService.getProducts(null);

        assertEquals(result,mockProductList);
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void testGetProductsByName(){
        mockProductList.add(new Product("123","product1","product","cat1",10,"brand1"));
        mockProductList.add(new Product("123","product2","product","cat1",10,"brand1"));
        when(this.productRepository.findByName("product2")) .thenReturn(mockProductList);

        List<Product> actual = productService.getProducts(null);
        List<Product> expected = new ArrayList<>();
        expected.add(mockProductList.get(1));

        assertEquals(expected,actual);
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void testGetProductById(){
        when(productRepository.findById(any(String.class))).thenReturn(Optional.of(mockProduct));

        Product result = productService.getProductById("");

        assertEquals(result,mockProduct);
        verify(productRepository, times(1)).findById(any(String.class));
    }

    @Test
    void testAddNewProduct(){
        when(productRepository.save(any(Product.class))).thenReturn(mockProduct);

        Product result = productService.addNewProduct(mockProduct);

        assertEquals(result,mockProduct);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testRemoveProduct(){
        doNothing().when(productRepository).deleteById(any(String.class));

        productService.removeProduct("111");

        verify(productRepository, times(1)).deleteById("111");
    }

    @Test
    void testUpdateProductDetails(){
        when(productRepository.save(any(Product.class))).thenReturn(mockProduct);

        Product result = productService.updateProductDetails(mockProduct);

        assertEquals(result, mockProduct);
        verify(productRepository, times(1)).save(mockProduct);
    }

    @Test
    void testGetAllProductCategories(){
        List<Product> testProdList = new ArrayList<>();
        testProdList.add(new Product("123","product1","product","cat1",10,"brand1"));
        when(productService.getProducts(null)).thenReturn(testProdList);

        List<String> expected = new ArrayList<>(List.of("cat1"));
        List<String> result = productService.getAllProductCategories();

        assertEquals(expected,result);
    }
}
