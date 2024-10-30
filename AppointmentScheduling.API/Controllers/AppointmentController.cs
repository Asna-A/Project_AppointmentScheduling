using System.Net.Cache;
using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private readonly IMediator _mediator;
        public SignUpController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> AddPatient([FromBody]AddpatientDTO dto)
        {
            var command = new AddPatientCommand
            {
                PatientName = dto.PatientName,
                Age=dto.Age,
                Gender=dto.Gender,

                Email=dto.Email,
                Phone=dto.Phone,

                City=dto.City,

                State=dto.State,

                Pin=dto.Pin,
                username=dto.username,
                password=dto.password

            };
            var  result= await _mediator.Send(command);
            return Ok(result);

        }

    }
}
