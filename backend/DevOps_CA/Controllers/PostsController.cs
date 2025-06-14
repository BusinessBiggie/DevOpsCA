using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using backend;
using backend.DTOs;

namespace DevOps_CA.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly ApplicationContext _context;


    public PostsController(ApplicationContext context) => _context = context;

    [HttpPost]
    public async Task<ActionResult<Post>> Create(CreatePostDTO dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Map DTO to Entity
        var post = new Post
        {
            Title = dto.Title,
            Content = dto.Content,
            Department = dto.Department,
            CreatedAt = DateTime.UtcNow
        };

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Post>>> GetAll()
    {
        var posts = await _context.Posts
            .AsNoTracking() // Optimization: no change tracking needed for read-only operations
            .ToListAsync();

        return Ok(posts);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetById(int id)
    {
        var post = await _context.Posts
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);

        if (post == null)
            return NotFound();

        return Ok(post);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post == null) return NotFound();

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, EditPostDTO dto)
    {
        if (id != dto.Id)
            return BadRequest("ID mismatch");

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingPost = await _context.Posts.FindAsync(id);
        if (existingPost == null)
            return NotFound();

        // Update only the properties from the DTO
        existingPost.Content = dto.Content;
        existingPost.Title = dto.Title;
        existingPost.Department = dto.Department;
        existingPost.UpdatedAt = DateTime.UtcNow; // Track when it was updated

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await PostExists(id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    private async Task<bool> PostExists(int id)
    {
        return await _context.Posts
            .AsNoTracking()
            .AnyAsync(p => p.Id == id);
    }
}