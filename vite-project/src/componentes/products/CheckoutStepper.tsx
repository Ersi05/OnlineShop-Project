import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import './CheckoutStepper.css';

export default function CheckoutStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const steps = [
    { title: 'Name', fields: ['firstName', 'lastName'] },
    { title: 'Email', fields: ['email'] },
    { title: 'Address', fields: ['address', 'city', 'zipCode', 'country'] }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isStepValid = (stepIndex: number) => {
    const stepFields = steps[stepIndex].fields;
    return stepFields.every(field => formData[field].trim() !== '');
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (isStepValid(currentStep)) {
      const jsonData = JSON.stringify(formData);

      alert('Order submitted successfully!');
      console.log('Form data:', formData);

      try {
        const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonData
        });

        const result = await response.json();
        console.log('Server response:', result);
      } catch (error) {
        console.error('Error submitting order:', error);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label>Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your street address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <label>ZIP Code</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="ZIP Code"
                />
              </div>
            </div>
            <div>
              <label>Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="Country"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="checkout-container">
        <h2>Checkout</h2>

        {/* Step Indicator */}
        <div className="step-indicator">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div
                className={`circle ${
                  index < currentStep
                    ? 'completed'
                    : index === currentStep
                    ? 'active'
                    : 'inactive'
                }`}
              >
                {index < currentStep ? <Check size={16} /> : index + 1}
              </div>
              <span
                className={`label ${
                  index <= currentStep ? 'label-active' : 'label-inactive'
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="step-content">
          <h3>
            Step {currentStep + 1}: {steps[currentStep].title}
          </h3>
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="previous-button"
          >
            <ChevronLeft size={16} style={{ marginRight: '4px' }} />
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid(currentStep)}
              className="complete-button"
            >
              Complete Order
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className="next-button"
            >
              Next
              <ChevronRight size={16} style={{ marginLeft: '4px' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
