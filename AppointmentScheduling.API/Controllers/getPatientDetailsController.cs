using AppointmentScheduling.Application.Request.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class getPatientDetailsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public getPatientDetailsController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet("{patientId}")]
        public async Task<IActionResult> getPatientDetails(int patientId)
        {
            getPatientDetails query = new getPatientDetails();
            query.patientId = patientId;
            var patient = await _mediator.Send(query);

            if (patient==null)
                return NotFound("No patient found");
            return Ok(patient);
        }
    }
}
