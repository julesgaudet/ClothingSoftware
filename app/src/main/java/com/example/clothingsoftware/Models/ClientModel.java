package com.example.clothingsoftware.Models;

public class ClientModel {
    private String email;
    private String address;
    private String first_name;
    private String last_name;
    private String country;
    private String city;
    private String region_state;
    private String zip_code;

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getCountry() {
        return country;
    }

    public String getCity() {
        return city;
    }

    public String getRegion_state() {
        return region_state;
    }

    public String getZip_code() {
        return zip_code;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setRegion_state(String region_state) {
        this.region_state = region_state;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }

}