package com.diet_management_system.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "full_name")
	private String name;
	private int age;
	private String gender;
	private String mobile;
	private String email;
	private String password;

	@Enumerated(EnumType.STRING)
	private Role role;

	private Double height;
	private Double weight;
	private Double bmi;
	private Double pregnant;

	private String status; // PENDING / APPROVED / REJECTED

	private String referralCode;
	private String medical_conditions;
	private String dietary_restrictions;
	private String dietary_type;

	@ManyToOne
	@JoinColumn(name = "batch_id")
	private Batch batch;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public Double getBmi() {
		return bmi;
	}

	public void setBmi(Double bmi) {
		this.bmi = bmi;
	}

	public Double getPregnant() {
		return pregnant;
	}

	public void setPregnant(Double pregnant) {
		this.pregnant = pregnant;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getReferralCode() {
		return referralCode;
	}

	public void setReferralCode(String referralCode) {
		this.referralCode = referralCode;
	}

	public String getMedical_conditions() {
		return medical_conditions;
	}

	public void setMedical_conditions(String medical_conditions) {
		this.medical_conditions = medical_conditions;
	}

	public String getDietary_restrictions() {
		return dietary_restrictions;
	}

	public void setDietary_restrictions(String dietary_restrictions) {
		this.dietary_restrictions = dietary_restrictions;
	}

	public String getDietary_type() {
		return dietary_type;
	}

	public void setDietary_type(String dietary_type) {
		this.dietary_type = dietary_type;
	}

	public Batch getBatch() {
		return batch;
	}

	public void setBatch(Batch batch) {
		this.batch = batch;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", age=" + age + ", gender=" + gender + ", mobile=" + mobile
				+ ", email=" + email + ", password=" + password + ", role=" + role + ", height=" + height + ", weight="
				+ weight + ", bmi=" + bmi + ", pregnant=" + pregnant + ", status=" + status + ", referralCode="
				+ referralCode + ", medical_conditions=" + medical_conditions + ", dietary_restrictions="
				+ dietary_restrictions + ", dietary_type=" + dietary_type + ", batch=" + batch + "]";
	}

}
