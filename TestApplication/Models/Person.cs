using System;
using System.ComponentModel.DataAnnotations;
using TestApplication.Validators;

namespace TestApplication.Models
{
    public class Person
    {
        public int Id { get; set; }
        [ValidationRegistration]
        public DateTime Registration { get; set; }
        [ValidationLastActivity]
        public DateTime LastActivity { get; set; }
    }
}
