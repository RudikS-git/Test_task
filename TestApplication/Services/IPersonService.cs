using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestApplication.Models;

namespace TestApplication.Services
{
    public interface IPersonService
    {
        public Task<IEnumerable<Person>> GetAsync(int count, int page);
        public Task<Person> CreateAsync(Person person);

        public Task<IEnumerable<Person>> SaveAsync(IEnumerable<Person> person);
        public Task<Person> UpdateAsync(Person person);
        public Task<Person> DeleteAsync(int id);

        public Task<double> CalculateRollingAsync(int day);
        public Task<IEnumerable<object>> CalculateLifeTimeAsync();
    }
}
