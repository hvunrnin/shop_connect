using System.Collections.Generic;
using System.Linq;
using dotnet_shop.Data;
using dotnet_shop.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_shop.Services
{
    public class ProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        // 모든 제품 가져오기
        public IEnumerable<Product> GetAll()
        {
            return _context.Products.ToList();  // 동기 방식으로 모든 제품을 가져옴
        }

        // ID로 제품 가져오기
        public Product GetById(int id)
        {
            return _context.Products.Find(id);  // 동기 방식으로 ID에 해당하는 제품 찾기
        }

        // 제품 추가
        public void Add(Product product)
        {
            _context.Products.Add(product);  // 제품 추가
            _context.SaveChanges();  // 변경 사항 저장 (동기 방식)
        }

        // 제품 수정
        public void Update(int id, Product updatedProduct)
        {
            var product = GetById(id);
            if (product != null)
            {
                product.Name = updatedProduct.Name;
                product.Price = updatedProduct.Price;
                _context.SaveChanges();  // 변경 사항 저장 (동기 방식)
            }
        }

        // 제품 삭제
        public void Delete(int id)
        {
            var product = GetById(id);
            if (product != null)
            {
                _context.Products.Remove(product);  // 제품 삭제
                _context.SaveChanges();  // 변경 사항 저장 (동기 방식)
            }
        }
    }
}
