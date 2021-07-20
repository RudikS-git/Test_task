using System;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using TestApplication.Exceptions;

namespace TestApplication.Middleware
{
    // https://brunomj.medium.com/net-5-0-web-api-global-error-handling-6c29f91f8951
    public class GlobalErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public GlobalErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                var response = context.Response;
                response.ContentType = "application/json";
                string message = "Some kind of error has occurred";

                switch (ex)
                {
                    case ServiceException:
                    case ValidationException:
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        message = ex.Message;
                        break;

                    default:
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                var errorResponse = new
                {
                    isError = true,
                    message = message,
                    statusCode = response.StatusCode
                };
                
                var errorJson = JsonConvert.SerializeObject(errorResponse);

                await response.WriteAsync(errorJson);
            }
        }
    }
}