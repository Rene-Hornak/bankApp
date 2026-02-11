package org.yourcompany.yourproject;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

public class BankServer {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/api/login", (HttpExchange exchange) -> {

            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:5173");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(200, -1);
                return;
            }

            if ("POST".equals(exchange.getRequestMethod())) {

                InputStream is = exchange.getRequestBody();
                String body = new String(is.readAllBytes());

                System.out.println("Received: " + body);

                String response;
                if (body.contains("\"username\":\"admin\"") &&
                    body.contains("\"password\":\"1234\"")) {

                    response = "{\"status\":\"OK\"}";
                    exchange.sendResponseHeaders(200, response.length());
                } else {
                    response = "{\"status\":\"FAIL\"}";
                    exchange.sendResponseHeaders(401, response.length());
                }

                try (OutputStream output = exchange.getResponseBody()) {
                    output.write(response.getBytes());
                }
            }
        });

        server.start();
        System.out.println("Server running on http://localhost:8080");
    }
}