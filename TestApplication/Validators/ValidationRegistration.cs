using System;
using System.ComponentModel.DataAnnotations;
using TestApplication.Models;

namespace TestApplication.Validators
{
    public class ValidationRegistration : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)  
        {  
            var person = (Person)validationContext.ObjectInstance;  
  
            if (person.Registration > person.LastActivity)  
                return new ValidationResult("Registration must be less than lastActivity");

            return (person.Registration <= DateTime.Now)  
                ? ValidationResult.Success  
                : new ValidationResult("Registraion must be less than today's date");  
        } 
    }
}