using FlowerStore.Models;
using FlowerStore.Temp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowerStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly FlowerStoreContext _context;

        public ReviewsController(FlowerStoreContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var reviews = await _context.Reviews.Select(r => new
            {
                ReviewId = r.ReviewId,
                Star = r.Star,
                ContentReviews = r.ContentReviews,
                ReviewsDate = r.ReviewsDate.ToString("dd/MM/yyyy HH:mm:ss"),
                ProductId = r.ProductId,
                ProductName = r.Product!.ProductName,
                CustomerId = r.CustomerId,
                CustomerName = r.Customer!.CustomerName,
                OrderId = r.OrderId
            }).ToListAsync();
            return Ok(reviews);
        }
        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteReviews(int? reviewId)
        {
            if (reviewId == null)
            {
                return NotFound();
            }
            var _reviews = await _context.Reviews.SingleOrDefaultAsync(r => r.ReviewId == reviewId);
            if (_reviews == null)
            {
                return NotFound();
            }
            _context.Reviews.Remove(_reviews);
            await _context.SaveChangesAsync();

            return Ok(reviewId);
        }

        [HttpPost]
        public async Task<IActionResult> PostReviews(ReviewsVM reviewsVM)
        {
            if (reviewsVM == null)
            {
                return BadRequest();
            }
            var _order = await _context.Orders.SingleOrDefaultAsync(o => o.OrderId == reviewsVM.OrderId);
            if (reviewsVM?.OrderId == null)
            {
                return BadRequest();
            }
            if (_order == null)
            {
                return BadRequest();
            }
            for (int i = 0; i < reviewsVM.DataProductId.Length; i++)
            {
                var _reviews = new Reviews();
                _reviews.Star = reviewsVM.DataStar[i];
                _reviews.ContentReviews = reviewsVM.DataContent[i];
                _reviews.ReviewsDate = DateTime.Now;
                _reviews.ProductId = reviewsVM.DataProductId[i];
                _reviews.CustomerId = reviewsVM.CustomerId;
                _reviews.OrderId = reviewsVM.OrderId;
                _context.Reviews.Add(_reviews);
            }
            _order.OrderStatusId = 6;
            await _context.SaveChangesAsync();
            return Ok(reviewsVM);
        }

        [HttpPut("UpdateContentReview/{reviewsId}")]
        public async Task<IActionResult> UpdateContentReviews(int reviewsId, Reviews reviews)
        {
            if (reviews == null)
            { return BadRequest(); }

            var _reviews = await _context.Reviews.SingleOrDefaultAsync(r => r.ReviewId == reviewsId);
            if (_reviews == null)
            {
                return NotFound();
            }
            if (reviews.Star > 0 && reviews.Star < 6)
            {
                _reviews.Star = reviews.Star;
                _reviews.ContentReviews = reviews.ContentReviews;
                _reviews.ReviewsDate = DateTime.Now;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            return BadRequest();
        }

        [HttpGet("GetListReviewsByProductId/{productId}")]
        public async Task<IActionResult> GetListReviewsByProductId(int? productId)
        {
            if (productId == null)
            {
                return NotFound();
            }
            var _review = await _context.Reviews.Where(r => r.ProductId == productId).Select(r => new {
                ReviewId = r.ReviewId,
                Star = r.Star,
                ContentReviews = r.ContentReviews,
                ReviewsDate = r.ReviewsDate.ToString("dd/MM/yyyy HH:mm:ss"),
                ProductId = r.ProductId,
                CustomerId = r.CustomerId,
                CustomerName = r.Customer!.CustomerName,
                OrderId = r.OrderId
            }).ToListAsync();
            if (_review == null)
            {
                return NotFound();
            }
            return Ok(_review);
        }

    }
}
