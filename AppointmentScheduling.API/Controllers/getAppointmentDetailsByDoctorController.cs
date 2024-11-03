using AppointmentScheduling.Application.Request.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class getAppointmentDetailsByDoctorController : ControllerBase
    {
        private readonly IMediator _mediator;

        public getAppointmentDetailsByDoctorController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet("{doctorId}")]
        public async Task<IActionResult> getAppointmentDetailsByDoctor(int doctorId)
        {
            GetAppointmentsByDoctorQuery query = new GetAppointmentsByDoctorQuery();
            query.Id = doctorId;
            var appointments = await _mediator.Send(query);

            if (!appointments.Any())
                return NotFound("No appointments found");
            return Ok(appointments);
        }
    }
}
