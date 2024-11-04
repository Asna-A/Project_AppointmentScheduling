using AppointmentScheduling.Application.Request.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class getDoctorProfileController : ControllerBase
    {
        private readonly IMediator _mediator;

        public getDoctorProfileController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet("{doctorId}")]
        public async Task<IActionResult> getDoctorDetails(int doctorId)
        {
            getDoctorDetailsQuery query = new getDoctorDetailsQuery();
            query.doctorId=doctorId;
            var doctor = await _mediator.Send(query);

            if (doctor == null)
                return NotFound("No doctor found");
            return Ok(doctor);
        }
    }
}
