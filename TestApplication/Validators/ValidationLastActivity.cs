using System;
using System.ComponentModel.DataAnnotations;
using TestApplication.Models;

namespace TestApplication.Validators
{
    public class ValidationLastActivity : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)  
        {
            var person = (Person)validationContext.ObjectInstance;  
  
            if (person.Registration > person.LastActivity)  
                return new ValidationResult("LastActivity must be greater than Registration");

            return (person.LastActivity <= DateTime.Now)  
                ? ValidationResult.Success  
                : new ValidationResult("LastActivity must be less than today's date");  
        } 
    }
}