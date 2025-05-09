package com.mycompany.mavenproject2;

/**
 * Main application class
 */
public class Mavenproject2 {

    public static void main(String[] args) {
        int first = 10;
        int second = 20;
        int sum = first + second;

        System.out.println(first + " + " + second + " = " + sum);
    }

    // Method to be tested
    public int add(int a, int b) {
        return a + b;
    }

    // Method to be tested
    public String getMessage() {
        return "Hello, NetBeans!";
    }
}
package com.mycompany.mavenproject2;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 * JUnit test class for Mavenproject2
 */
public class Mavenproject2Test {

    Mavenproject2 app;

    public Mavenproject2Test() {
    }

    @BeforeClass
    public static void setUpClass() {
        System.out.println("Before Class");
    }

    @AfterClass
    public static void tearDownClass() {
        System.out.println("After Class");
    }

    @Before
    public void setUp() {
        System.out.println("Before each test");
        app = new Mavenproject2();
    }

    @After
    public void tearDown() {
        System.out.println("After each test");
    }

    @Test
    public void testAdd() {
        int result = app.add(5, 7);
        assertEquals(12, result);
    }

    @Test
    public void testMessage() {
        String msg = app.getMessage();
        assertNotNull(msg);
        assertEquals("Hello, NetBeans!", msg);
    }
}