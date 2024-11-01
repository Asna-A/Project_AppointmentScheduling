using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Application.Request.Commands;
using AppointmentScheduling.Application.Request.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetDoctorBySpecController : ControllerBase
    {
      
            private readonly IMediator _mediator;

            public GetDoctorBySpecController(IMediator mediator)
            {
                _mediator = mediator;
            }


            [HttpGet("{specializationId}/specialization")]
            public async Task<IActionResult> GetDoctorBySpec(int specializationId)
            {
                GetDoctorBySpec query=new GetDoctorBySpec();
                query.specializationId = specializationId;
                var doctors = await _mediator.Send(query);

                if (!doctors.Any())
                    return NotFound("No doctors found for this specialization.");
                return Ok(doctors);
        }
    }
    
}
