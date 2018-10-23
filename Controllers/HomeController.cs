using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppSettings _appSettings;
        public HomeController(IOptions<AppSettings> settings)
        {
            _appSettings = settings.Value;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SendEmail(string email,string question)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(question))
            {
                return new StatusCodeResult(500);
            }
            var client = new SmtpClient
            {
                Host = _appSettings.Host,
                Port = _appSettings.Port,
                EnableSsl = _appSettings.EnableSsl,
                Credentials = new NetworkCredential(_appSettings.EmailUsed, _appSettings.Password)
            };

            using (var message = new MailMessage(_appSettings.EmailUsed, _appSettings.EmailUsed)
            {
                Subject = "sent from provetoken.io/contact",
                Body = string.Format("from: {0} \n {1}", WebUtility.HtmlEncode(email), WebUtility.HtmlEncode(question))
            })
            {
                try
                {
                    client.Send(message);
                    return new JsonResult(null);
                }
                catch (Exception)
                {
                    return new StatusCodeResult(500);
                }   
            }
        }
    }
}
