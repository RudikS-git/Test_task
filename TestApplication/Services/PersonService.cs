using System;
using System.Collections.Generic;
using TestApplication.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TestApplication.Exceptions;

namespace TestApplication.Services
{
    public class PersonService : IPersonService
    {
        private readonly DataContext _dataContext;

        public PersonService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Person>> GetAsync(int count, int page)
        {
            return await _dataContext.People
                .OrderByDescending(item => item.Registration)
                .Skip(count * page)
                .Take(count)
                .ToListAsync();
        }

        public async Task<Person> CreateAsync(Person person)
        {
            var entityPerson = await _dataContext.People.AddAsync(person);
            var num = await _dataContext.SaveChangesAsync();

            return entityPerson.Entity;
        }

        public async Task<IEnumerable<Person>> SaveAsync(IEnumerable<Person> person)
        {
            await _dataContext.People.AddRangeAsync(person.Where(it => it.Id == 0));
            _dataContext.People.UpdateRange(person.Where(it => it.Id != 0));

            await _dataContext.SaveChangesAsync();

            return person.OrderByDescending(it => it.Registration);
        }

        public async Task<Person> UpdateAsync(Person person)
        {
            _dataContext.People.Update(person);
            await _dataContext.SaveChangesAsync();
            
            return person;
        }

        public async Task<Person> DeleteAsync(int id)
        {
            var person = await _dataContext.People.FindAsync(id);

            if (person == null)
            {
                throw new ServiceException("Person hasn't been found");
            }

            _dataContext.People.Remove(person);
            await _dataContext.SaveChangesAsync();
            
            return person;
        }

        public async Task<double> CalculateRollingAsync(int day)
        {
            int numberPeopleReturning = await _dataContext.People
                .Where(it => it.LastActivity >= it.Registration.AddDays(day))
                .CountAsync();
            
            DateTime inDay = DateTime.Now.AddDays(-day);
            int numberPeopleInstalled = await _dataContext.People
                .Where(it => it.Registration <= inDay)
                .CountAsync();

            if (numberPeopleInstalled == 0)
            {
                throw new ServiceException($"There aren't people who installed earlier than {day} days ago");
            }
            
            double rollingRetention = ((double)numberPeopleReturning / numberPeopleInstalled) * 100;
            
            return rollingRetention;
        }

        public async Task<IEnumerable<object>> CalculateLifeTimeAsync()
        {
             var data = await _dataContext.People
                .Select(it => (it.LastActivity.Date - it.Registration.Date).Days)
                .GroupBy(it => it)
                .Select(it => new { day = it.Key, count = it.Count()})
                .OrderBy(it => it.day)
                .ToListAsync();

           /*  foreach (var i in Enumerable.Range(0, 30))
             {
                 if (data.Find(it => it.day == i) == null)
                 {
                     data.Add(new { day = i, count = 0});
                 }
             }*/


             return data; //.OrderBy(it => it.day);
        }
    }
}
