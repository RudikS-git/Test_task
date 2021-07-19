using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestApplication.Models;
using TestApplication.Services;

namespace TestApplication.Controllers
{
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        public async Task<IEnumerable<Person>> GetAll(int count = 100, int page = 0)
        {
            return await _personService.GetAsync(count, page);
        }

        [HttpGet("CalculateRolling")]
        public async Task<double> CalculateRolling(int day = 7)
        {
            return await _personService.CalculateRollingAsync(day);
        }

        [HttpGet("CalculatePeopleLifeTime")]
        public async Task<IEnumerable<object>> CalculatePeopleLifeTime()
        {
            return await _personService.CalculateLifeTimeAsync();
        }

        [HttpPost]
        public async Task<Person> Create([FromBody] Person person)
        {
            if (!ModelState.IsValid)
            {
                throw new ValidationException(ModelState.Values.FirstOrDefault()?
                                                .Errors.FirstOrDefault()?.ErrorMessage);
            }
            
            return await _personService.CreateAsync(person);
        }

        [HttpPut]
        public async Task<IEnumerable<Person>> Save([FromBody] IEnumerable<Person> people)
        {
            if (!ModelState.IsValid)
            {
                throw new ValidationException(ModelState.Values.FirstOrDefault()?
                    .Errors.FirstOrDefault()?.ErrorMessage);
            }
            
            return await _personService.SaveAsync(people);
        }

        [HttpDelete("{id}")]
        public async Task<Person> Delete(int id)
        {
            return await _personService.DeleteAsync(id);
        }
    }
}
