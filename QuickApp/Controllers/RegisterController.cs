using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DAL.Core.Interfaces;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuickApp.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IAccountManager _accountManager;

        public RegisterController(IMapper mapper, IAccountManager accountManager)
        {
            _mapper = mapper;
            _accountManager = accountManager;
        }



        [HttpPost("register")]
        [ProducesResponseType(201, Type = typeof(UserViewModel))]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> Register([FromBody] UserEditViewModel user)
        {
            user.Roles = new [] { "user"};
            user.IsEnabled = true;

            
            if (ModelState.IsValid)
            {
                if (user == null)
                    return BadRequest($"{nameof(user)} cannot be null");


                ApplicationUser appUser = _mapper.Map<ApplicationUser>(user);

                var result = await _accountManager.CreateUserAsync(appUser, user.Roles, user.NewPassword);
                if (result.Succeeded)
                {
                    return CreatedAtAction("register",user);
                }

                AddError(result.Errors);
            }
            return BadRequest(ModelState);
        }



        private void AddError(IEnumerable<string> errors, string key = "")
        {
            foreach (var error in errors)
            {
                AddError(error, key);
            }
        }

        private void AddError(string error, string key = "")
        {
            ModelState.AddModelError(key, error);
        }

    }
}
