// src/components/RegistrationForm.js
import React, { useState, useEffect, useMemo } from 'react'; // 1. Import useMemo
import { useNavigate } from 'react-router-dom';
import { countries, phoneCountryCodes } from '../data/locations';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();

  // 2. Wrap initialFormData with useMemo
  const initialFormData = useMemo(() => {
    // Make the default phoneCountryCode selection safer
    const defaultPhoneCode = phoneCountryCodes.length > 0 ? phoneCountryCodes[0].code : '+1'; // Default to first or a fallback

    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      phoneCountryCode: defaultPhoneCode,
      phoneNumber: '',
      country: '',
      city: '',
      panNo: '',
      aadharNo: '',
    };
  }, []); // 3. Add an empty dependency array because phoneCountryCodes is static from import.
           // If phoneCountryCodes could change based on props or state, you'd add it here.

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name, value) => {
    let errorMsg = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'username':
        if (!value.trim()) errorMsg = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
        else if (name === 'username' && !/^[a-zA-Z0-9_]{3,16}$/.test(value))
          errorMsg = 'Username must be 3-16 characters, alphanumeric or underscore.';
        break;
      case 'email':
        if (!value.trim()) errorMsg = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = 'Invalid email format.';
        break;
      case 'password':
        if (!value) errorMsg = 'Password is required.';
        else if (value.length < 8) errorMsg = 'Password must be at least 8 characters.';
        break;
      case 'phoneNumber':
        if (!value.trim()) errorMsg = 'Phone number is required.';
        else if (!/^\d{10}$/.test(value)) errorMsg = 'Phone number must be 10 digits.';
        break;
      case 'country':
        if (!value) errorMsg = 'Country is required.';
        break;
      case 'city':
        // City validation is a bit more nuanced now with country dependency
        if (formData.country && !value) errorMsg = 'City is required once a country is selected.';
        else if (!formData.country && !value) errorMsg = ''; // Not an error if country isn't selected
        break;
      case 'panNo':
        if (!value.trim()) errorMsg = 'PAN No. is required.';
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase()))
          errorMsg = 'Invalid PAN No. format (e.g., ABCDE1234F).';
        break;
      case 'aadharNo':
        if (!value.trim()) errorMsg = 'Aadhar No. is required.';
        else if (!/^\d{12}$/.test(value)) errorMsg = 'Aadhar No. must be 12 digits.';
        break;
      default:
        break;
    }
    return errorMsg;
  };

  useEffect(() => {
    let allFieldsFilledAndValid = true;
    const currentErrors = {}; // To calculate errors based on current formData

    for (const key in initialFormData) { // Iterate over keys of stable initialFormData
      const value = formData[key];
      const error = validateField(key, value);
      currentErrors[key] = error; // Store current validation status

      if (key === 'city' && !formData.country && !value) {
        // City is optional if country is not selected
        continue;
      }
      if (error || (value === '' && initialFormData.hasOwnProperty(key))) { // Check if field is empty or has an error
        // Special handling for city if country is not selected
        if (key === 'city' && !formData.country) {
            // If country is not selected, city is not strictly required for form validity button
        } else if (value === '' || error) {
             allFieldsFilledAndValid = false;
        }
      }
    }
    setIsFormValid(allFieldsFilledAndValid && !Object.values(currentErrors).some(e => e !== ''));

  }, [formData, initialFormData]); // Removed 'errors' from here, as we are re-evaluating validity based on formData


  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Validate on change
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === 'country') {
      const selectedCountry = countries.find((c) => c.name === value);
      setAvailableCities(selectedCountry ? selectedCountry.cities : []);
      // Reset city and its error when country changes
      setFormData((prev) => ({ ...prev, city: '' }));
      setErrors((prev) => ({ ...prev, city: validateField('city', '') }));
      if (value === "") {
        setErrors((prev) => ({ ...prev, city: '' })); // Clear city error if country is unselected
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      // Special handling for city: if country isn't selected, city isn't strictly required for submission
      if (key === 'city' && !formData.country) {
        newErrors[key] = ''; // Clear any previous city error if country not selected
        return;
      }
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        formIsValid = false;
      } else {
        newErrors[key] = ''; // Ensure no stale error message
      }
    });
    setErrors(newErrors);

    if (formIsValid && isFormValid) { // Double check with state based isFormValid as well
      console.log('Form Submitted:', formData);
      navigate('/success', { state: { submittedData: formData } });
    } else {
      console.log('Form has errors. Calculated newErrors:', newErrors);
      // Focus the first field with an error
        const firstErrorField = Object.keys(newErrors).find(key => newErrors[key]);
        if (firstErrorField) {
            const fieldElement = document.getElementById(firstErrorField);
            if (fieldElement) {
                fieldElement.focus();
            }
        }
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.firstName ? 'input-error' : ''}
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && <p id="firstName-error" className="error-message">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.lastName ? 'input-error' : ''}
            aria-required="true"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && <p id="lastName-error" className="error-message">{errors.lastName}</p>}
        </div>

        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username ? 'input-error' : ''}
            aria-required="true"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && <p id="username-error" className="error-message">{errors.username}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? 'input-error' : ''}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="error-message">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password ? 'input-error' : ''}
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="show-hide-btn" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p id="password-error" className="error-message">{errors.password}</p>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone No.:</label>
          <div className="phone-group">
            <select
              name="phoneCountryCode"
              value={formData.phoneCountryCode}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-label="Phone country code"
            >
              {phoneCountryCodes.map((country) => (
                <option key={country.code + country.name} value={country.code}> {/* Ensure unique key */}
                  {country.name}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="10 digit number"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phoneNumber ? 'input-error' : ''}
              aria-required="true"
              aria-invalid={!!errors.phoneNumber}
              aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
            />
          </div>
          {errors.phoneNumber && <p id="phoneNumber-error" className="error-message">{errors.phoneNumber}</p>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.country ? 'input-error' : ''}
            aria-required="true"
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "country-error" : undefined}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <p id="country-error" className="error-message">{errors.country}</p>}
        </div>

        {/* City */}
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!formData.country || availableCities.length === 0}
            className={errors.city ? 'input-error' : ''}
            aria-required={!!formData.country} // Required only if country is selected
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
          >
            <option value="">Select City</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && formData.country && <p id="city-error" className="error-message">{errors.city}</p>} {/* Show city error only if country selected */}
        </div>

        {/* PAN No. */}
        <div className="form-group">
          <label htmlFor="panNo">PAN No.:</label>
          <input
            type="text"
            id="panNo"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.panNo ? 'input-error' : ''}
            style={{ textTransform: 'uppercase' }}
            aria-required="true"
            aria-invalid={!!errors.panNo}
            aria-describedby={errors.panNo ? "panNo-error" : undefined}
          />
          {errors.panNo && <p id="panNo-error" className="error-message">{errors.panNo}</p>}
        </div>

        {/* Aadhar No. */}
        <div className="form-group">
          <label htmlFor="aadharNo">Aadhar No.:</label>
          <input
            type="text"
            id="aadharNo"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.aadharNo ? 'input-error' : ''}
            aria-required="true"
            aria-invalid={!!errors.aadharNo}
            aria-describedby={errors.aadharNo ? "aadharNo-error" : undefined}
          />
          {errors.aadharNo && <p id="aadharNo-error" className="error-message">{errors.aadharNo}</p>}
        </div>

        <button type="submit" disabled={!isFormValid} className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;