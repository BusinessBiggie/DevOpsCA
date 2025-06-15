using System.ComponentModel.DataAnnotations;
using backend.DTOs;
using Models;

namespace DevOps_CA.Tests.Models;

public class PostTests
{
    [Fact]
    public void Post_New_HasDefaultValues()
    {
        var post = new Post();

        Assert.Equal(0, post.Id);
        Assert.Null(post.Title);
        Assert.Null(post.Content);
        Assert.Equal(Department.Technology, post.Department);
        Assert.Null(post.UpdatedAt);
    }

    [Fact]
    public void Post_SetValues_Works()
    {
        var post = new Post();
        post.Id = 1;
        post.Title = "Test";
        post.Content = "Content";
        post.Department = Department.Marketing;

        Assert.Equal(1, post.Id);
        Assert.Equal("Test", post.Title);
        Assert.Equal("Content", post.Content);
        Assert.Equal(Department.Marketing, post.Department);
    }
    
    [Fact]
    public void CreatePostDTO_ValidData_NoErrors()
    {
        var dto = new CreatePostDTO
        {
            Title = "Good Title",
            Content = "Good Content",
            Department = Department.Technology
        };

        var errors = new List<ValidationResult>();
        var context = new ValidationContext(dto);
        var isValid = Validator.TryValidateObject(dto, context, errors, true);

        Assert.True(isValid);
        Assert.Empty(errors);
    }

    [Fact]
    public void CreatePostDTO_EmptyTitle_HasErrors()
    {
        var dto = new CreatePostDTO
        {
            Title = "",
            Content = "Good Content",
            Department = Department.Technology
        };

        var errors = new List<ValidationResult>();
        var context = new ValidationContext(dto);
        var isValid = Validator.TryValidateObject(dto, context, errors, true);

        Assert.False(isValid);
        Assert.NotEmpty(errors);
    }

    [Fact]
    public void CreatePostDTO_NoContent_HasErrors()
    {
        var dto = new CreatePostDTO
        {
            Title = "Good Title",
            Content = "",
            Department = Department.Technology
        };

        var errors = new List<ValidationResult>();
        var context = new ValidationContext(dto);
        var isValid = Validator.TryValidateObject(dto, context, errors, true);

        Assert.False(isValid);
        Assert.NotEmpty(errors);
    }

    [Fact]
    public void CreatePostDTO_TitleTooLong_HasErrors()
    {
        var longTitle = new string('A', 201); // 201 characters is too long

        var dto = new CreatePostDTO
        {
            Title = longTitle,
            Content = "Good Content",
            Department = Department.Technology
        };

        var errors = new List<ValidationResult>();
        var context = new ValidationContext(dto);
        var isValid = Validator.TryValidateObject(dto, context, errors, true);

        Assert.False(isValid);
        Assert.NotEmpty(errors);
    }

    [Fact]
    public void CreatePostDTO_ContentTooLong_HasErrors()
    {
        var longContent = new string('A', 2401); // 2401 characters is too long

        var dto = new CreatePostDTO
        {
            Title = "Good Title",
            Content = longContent,
            Department = Department.Technology
        };

        var errors = new List<ValidationResult>();
        var context = new ValidationContext(dto);
        var isValid = Validator.TryValidateObject(dto, context, errors, true);

        Assert.False(isValid);
        Assert.NotEmpty(errors);
    }
    
    [Fact]
    public void EditPostDTO_ValidData_NoErrors()
    {
        var dto = new EditPostDTO
        {
            Id = 1,
            Title = "Updated Title",
            Content = "Updated Content",
            Department = Department.Marketing
        };

        var errors = new List<ValidationResult>();
        var context = new ValidationContext(dto);
        var isValid = Validator.TryValidateObject(dto, context, errors, true);

        Assert.True(isValid);
        Assert.Empty(errors);
    }

    [Fact]
    public void EditPostDTO_TitleTooLong_HasErrors()
    {
        var longTitle = new string('A', 201); // 201 characters is too long

        var dto = new EditPostDTO
        {
            Id = 1,
            Title = longTitle,
            Content = "Good Content",
            Department = Department.Technology
        };

        var errors = new List<ValidationResult>();
        var context = new ValidationContext(dto);
        var isValid = Validator.TryValidateObject(dto, context, errors, true);

        Assert.False(isValid);
        Assert.NotEmpty(errors);
    }
}